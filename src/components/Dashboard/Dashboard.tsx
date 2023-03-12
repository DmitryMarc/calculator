import { FC } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardProps } from "../../@types/common";

import styles from "./Dashboard.module.css";

const Dashboard: FC<BoardProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id} key={id} isDropDisabled>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.list}>
          {list.map((item, index) => {
            const isDragDisabled = item.id.split('-').includes('copy');
            return (
              <Draggable draggableId={item.id} index={index} key={item.id} isDragDisabled={isDragDisabled}>
                {(provided, snapshot) => {
                  return (
                    <>
                      <div className={`${styles.item} ${snapshot.isDragging && styles.dragging} 
                      ${isDragDisabled && styles.disabled}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.component}
                      </div>
                      {snapshot.isDragging &&
                        <div className={styles.copy}>
                          {item.component}
                        </div>
                      }
                    </>
                  )
                }}
              </Draggable>
            )
          }
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Dashboard