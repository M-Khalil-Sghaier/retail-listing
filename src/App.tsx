import React from "react";
import { RiCloseLine, RiH1 } from "react-icons/ri";
import { VariableSizeList as List } from "react-window";

// Components
import Button from "./components/Button/Button";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/Modal/Modal";
import SelectBox from "./components/SelectBox/SelectBox";
import SearchField from "./components/SearchField/SearchField";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SwitchBox from "./components/SwitchBox/SwitchBox";
// Utils
import parser from "./utils/parser";
import {arrayToMatrix} from "./utils/arrayToMatrix";
// Hooks
import useFetch from "./hooks/useFetch";
import { Product } from "types/product.type";
// import { Product } from "types/product.type";

function App() {
  // Gender select optionsList
  // Needs to be memoised for object referential integrity
  const genderFilterOptions = React.useMemo(
    () => [
      { id: 1, name: "All", value: null },
      { id: 2, name: "Female", value: "female" },
      { id: 3, name: "Male", value: "male" },
      { id: 4, name: "Unisex", value: "unisex" },
    ],
    []
  );

  // Paper wrapper ref
  const paperWrapperRef = React.useRef<HTMLDivElement | null>(null);
  // Gender filter state
  const [filter, setFilter] = React.useState(genderFilterOptions[0]);
  // Currently selected product state
  const [clickedProduct, setClickedProduct] = React.useState<Product | null>(
    null
  );
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // Sales switch state
  const [showOnSale, setShowOnSale] = React.useState(false);
  // Search field state
  const [searchQuery, setSearchQuery] = React.useState("");
  // Container width state
  const [containerWidth, setContainerWidth] = React.useState(1);

  const { data } = useFetch<string>(`${process.env.PUBLIC_URL}/products.csv`);

  const productsList = React.useMemo(() => {
    if (data) {
      const parsedProducts = parser(data) as Product[];
      // Filter by gender if sales filter has a value
      if (filter.value && !showOnSale) {
        return parsedProducts.filter(
          (product) =>
            product.gender === filter.value &&
            product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }
      // Show products on sale
      // Check if other filters are set and filter accordingly
      if (showOnSale) {
        return parsedProducts.filter((product) =>
          filter.value
            ? product.sale_price < product.price &&
              product.gender === filter.value &&
              product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            : product.sale_price < product.price &&
              product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }
      // Return all products
      return parsedProducts.filter((product) =>
        product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return null;
  }, [data, filter.value, showOnSale, searchQuery]);

  const productClickHandler = (product: Product) => {
    // Set selected product
    setClickedProduct(product);
    // Open modal with with the selected product
    setIsModalOpen(true);
  };

  const onSearchFieldSelection = (product: Product) => {
    setSearchQuery(product.title);
  };

  React.useLayoutEffect(() => {
    if (paperWrapperRef.current) {
      // Render the list on window resize
      window.addEventListener("resize", (e) => {
        setContainerWidth((e.target as Window).innerWidth);
      });
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [paperWrapperRef.current]);

  return (
    <div className="w-screen h-screen p-2 overflow-hidden bg-gray-200">
      <div
        className="w-full h-full p-4 overflow-hidden bg-white rounded shadow-md"
        ref={paperWrapperRef}
      >
        <div className="sticky z-30 px-4 py-5 -mx-4 bg-white -top-6">
          <div className="grid items-end grid-cols-3 gap-4">
            {/* Search by title */}
            {/* <SearchField
              // options={productsList?.slice(0, 100) ?? []}
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={onSearchFieldSelection}
              placeholder="Search"
            /> */}
            {/* Filter by gender */}
            <SelectBox
              selected={filter}
              options={genderFilterOptions}
              onChange={(selected) => setFilter(selected)}
            />
            {/* Show items on sale */}
            <SwitchBox
              label="Sales"
              enabled={showOnSale}
              onChange={setShowOnSale}
            />
          </div>
        </div>
        {productsList && productsList.length > 0 && containerWidth > 0 && (
          <List
            itemCount={arrayToMatrix(productsList)?.length ?? 0}
            itemSize={() => 400}
            width={paperWrapperRef?.current?.clientWidth ?? "100%"}
            height={paperWrapperRef?.current?.clientHeight ?? "100%"}
          >
            {({ index, style }) => (
              <div className="flex gap-4 py-5 pr-5" style={{ ...style }}>
                {arrayToMatrix(productsList) &&
                  arrayToMatrix(productsList).length &&
                  arrayToMatrix(productsList)[index]?.map((item: Product) => (
                    <div
                      className="flex-grow-0 w-1/3 h-full"
                      key={item.gtin}
                      data-testid="product-item"
                    >
                      <ProductCard
                        product={item}
                        clickHandler={productClickHandler}
                      />
                    </div>
                  ))}
              </div>
            )}
          </List>
        )}
        {/* ImageGallery Modal */}
        <Modal
          isOpen={Boolean(isModalOpen && clickedProduct)}
          title={`${clickedProduct?.title} - ${clickedProduct?.price}`}
          onClose={() => {
            setIsModalOpen(false);
            setClickedProduct(null);
          }}
        >
          <ImageGallery
            imageLinks={clickedProduct?.additional_image_link.split(", ") ?? []}
          />
          <div className="absolute top-2 right-3">
            <Button onClick={() => setIsModalOpen(false)}>
              <RiCloseLine />
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
