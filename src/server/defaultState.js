export const defaultState = {
    user: {
        name: "Family"
    },
    types: [
        {
            _id: 1,
            name: 'Baked Beans',
            brand: 'Heinz',
        },
        {
            _id: 2,
            brand: 'Maggi',
            name: 'noodles'
        }
    ],
    items: [
        {
            _id: 1,
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
            _id: 2,
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