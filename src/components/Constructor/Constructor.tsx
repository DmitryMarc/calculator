import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardProps, ListItem } from "../../@types/common";
import styles from './Constructor.module.css';

import { useSelector } from "react-redux";
import adding from '../../assets/icons/adding.svg';
import pointer from '../../assets/icons/cursor-pointer.svg';
import underline from '../../assets/icons/underline.svg';
import { selectIsRuntime } from "../../redux/features/mode/modeSlice";

const getListStyle = (isDraggingOver: boolean, list: ListItem[]) => ({
    background: isDraggingOver && !list.length ? '#F0F9FF' : 'white',
    border: list.length ? '2px dashed transparent' : '2px dashed #C4C4C4',
    borderTop: list.length ? 'none' : '2px dashed #C4C4C4',
});

const getItemStyle = (isRuntime: boolean) => ({
    cursor: isRuntime ? `url(${pointer}) 10 10, auto` : 'drag'
})

const getPlaceholderStyle = (list: ListItem[]) => ({
    display: list.length ? 'none' : 'block'
});

const getDividerStyle = (transform: string | undefined, isDragging: boolean) => ({
    display: !isDragging || (isDragging && (transform)) ? 'none' : 'block'
});

const Constructor: FC<BoardProps & { isDragging: boolean }> = ({ col: { list, id }, isDragging }) => {
    const isRuntime = useSelector(selectIsRuntime);
    return (
        <Droppable droppableId={id} key={id}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.construction}
                    style={getListStyle(snapshot.isDraggingOver, list)}>
                    {list.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id} isDragDisabled={isRuntime || item.id === 'Display'} >
                            {(provided) => {
                                return (
                                    <div style={getItemStyle(isRuntime)}>
                                        <div className={styles.item}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.component}
                                            <img className={styles.divider}
                                                style={getDividerStyle(provided.draggableProps.style?.transform, isDragging)}
                                                src={underline} alt="underline" />
                                        </div>
                                    </div>
                                )
                            }}
                        </Draggable>
                    )
                    )}
                    <div className={styles.content} style={getPlaceholderStyle(list)}>
                        <img className={styles.icon} src={adding} alt="adding" />
                        <div className={styles.attention}>Перетащите сюда</div>
                        <div className={styles.explanation}>любой элемент из левой панели</div>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Constructor;