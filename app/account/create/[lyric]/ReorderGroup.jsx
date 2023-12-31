import React from "react";
import { Reorder, motion, useDragControls } from "framer-motion";
import LineButtons from "./LineButtons";
import { VscGrabber } from "react-icons/vsc";

function ReorderGroup({
  items,
  handleReorder,
  handleTextChange,
  handleButton,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const controls = useDragControls();

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={handleReorder}
      className="flex flex-col">
      {items.map((item) => {
        return (
          <Reorder.Item
            key={item.id}
            value={item}
            className="flex items-center gap-x-2 cursor-move"
            dragListener={false}
            dragControls={controls}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}>
            <div onPointerDown={(e) => controls.start(e)}>
              <VscGrabber />
            </div>
            <motion.div className="w-[500px]">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  defaultValue={item.line}
                  onBlur={(e) => {
                    handleTextChange(item, e.target.value);
                  }}
                  type="text"
                  id={`input-${item}`}
                  autoComplete="off"
                  className="w-full mt-1 px-4 bg-transparent"
                />
              </form>
            </motion.div>
            <LineButtons
              handleButton={(button) =>
                handleButton({ button: button, id: item.id })
              }
            />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

export default ReorderGroup;
