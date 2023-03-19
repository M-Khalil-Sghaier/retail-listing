import React from "react";
import { Switch } from "@headlessui/react";

type SwitchBoxProps = {
  label: string;
  enabled: boolean;
  onChange: (checked: boolean) => void;
};

const SwitchBox = ({ label, enabled, onChange }: SwitchBoxProps) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={onChange}
          className={`${
            enabled ? "bg-red-600" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-100`}
          data-testid="switch-button"
        >
          <span
            data-testid={`switch-${enabled ? "on" : "off"}`}
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default SwitchBox;
