/**
 * Converts an array to a matrix of size 3xN, where N is the number of elements in the array.
 * @param array The array to convert to a matrix.
 * @returns The matrix representation of the input array.
 */
export const arrayToMatrix = (array: any[]): any[][] =>
  // Use the reduce function to iterate over the array and build the matrix.
  array.reduce(
    // The reduce function takes two arguments: an accumulator and the current element in the iteration.
    // The accumulator is initialized as an empty array, which will hold the rows of the matrix.
    // The current element is a key in the input array.
    (rows: any[][], key: any, index: number) =>
      // Check if the current index is divisible by 3, indicating the start of a new row.
      index % 3 === 0
        ? // If it is, create a new row in the matrix with the current key.
          rows.push([key])
        : // If it's not, add the current key to the last row in the matrix.
          rows[rows.length - 1].push(key) &&
          // Return the updated accumulator after each iteration.
          rows,
    // The initial value of the accumulator is an empty array.
    [],
  );
