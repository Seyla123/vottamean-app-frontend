import React from "react";
import DataTable from "../components/common/DataTable";

const TestPage = () => {
    const columns = [
        { id: "name", label: "Dessert (100g serving)" },
        { id: "calories", label: "Calories", align: "right" },
        { id: "fat", label: "Fat (g)", align: "right" },
        { id: "carbs", label: "Carbs (g)", align: "right" },
        { id: "protein", label: "Protein (g)", align: "right" },
    ];

    const rows = [
        {
            id: 1,
            name: "Frozen yoghurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
        {
            id: 2,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
        },
        {
            id: 3,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 24,
            protein: 6.0,
        },
        {
            id: 4,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
        },
        {
            id: 5,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
        },
    ];

    const handleEdit = (row) => {
        console.log("Edit", row);
    };

    const handleDelete = (row) => {
        console.log("Delete", row);
    };

    const handleSelectedDelete = () => {
        console.log("Delete all");
    };

    return (
        <div>
            <DataTable
                rows={rows}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
            />
        </div>
    );
};

export default TestPage;
