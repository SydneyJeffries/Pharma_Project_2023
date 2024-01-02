import _ from 'lodash';
import { useState } from 'react';

export interface GridPaginationModel {
    page: number;
    pageSize: number;
}

export default function UsePagination(initialState: GridPaginationModel) {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(initialState);

    const handlePaginationModelChange = (newModel: GridPaginationModel) => {
        if (!_.isEqual(paginationModel, newModel)) {
            if (paginationModel.pageSize !== newModel.pageSize) {
                newModel.page = 0;
            }
            setPaginationModel(newModel);
        }
    };

    return {
        paginationModel,
        handlePaginationModelChange
    };
};