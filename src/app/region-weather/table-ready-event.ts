interface TableReadyEvent {
    error: Error;
    isTableReady: boolean;
    isLoading: boolean;
}

export default TableReadyEvent;