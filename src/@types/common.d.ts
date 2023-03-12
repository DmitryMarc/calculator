export type ListItem = {
    id: string;
    component: JSX.Element;
}

export type BoardProps = {
    col: {
        id: string,
        list: ListItem[]
    }
}
