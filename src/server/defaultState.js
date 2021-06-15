export const defaultState = {
    user: {
        name: "Family"
    },
    types: [
        {
            id: 1,
            name: 'Baked Beans',
            brand: 'Heinz',
        },
        {
            id: 2,
            brand: 'Maggi',
            name: 'noodles'
        }
    ],
    items: [
        {
            id: 1,
            expiry: '16/4/2022',
            type: {
                name: 'Baked Beans',
                brand: 'Heinz'
            },
            location: {
                name: 'kitchen',
            }
        },
        {
            id: 2,
            expiry: '16/4/2022',
            type: {
                brand: 'Maggi',
                name: 'noodles'
            },
            location: {
                name: 'Under Rachel\'s bed',
            }
        }
    ]
};