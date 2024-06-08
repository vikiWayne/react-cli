import { FC } from "react";
import { ComponentProps } from "./Component.types";

const Component: FC<ComponentProps> = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
      Component
    </div>
  );
};

export default Component;
