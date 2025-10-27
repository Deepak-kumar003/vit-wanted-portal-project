export const wantedItems = [
    // These two items will belong to our "current user" (userId: 1)
    { id: 1, userId: 1, name: 'Looking for a Calculus Textbook', description: 'Need a used Calculus textbook for semester 3...', category: 'Books', budget: '₹500', postedTime: '2 hours ago', imageUrl: 'https://via.placeholder.com/600x400?text=Textbook+Image', user: { name: 'Rohan Sharma' } },
    { id: 5, userId: 1, name: 'Another Lab Coat', description: 'Need another lab coat, size Large this time.', category: 'Lab Equipment', budget: '₹250', postedTime: '6 days ago', imageUrl: 'https://via.placeholder.com/600x400?text=Lab+Coat+Image', user: { name: 'Rohan Sharma' } },

    // These items belong to other users
    { id: 2, userId: 2, name: 'Need a Scientific Calculator', description: 'Looking for a scientific calculator, preferably Casio fx-991EX...', category: 'Electronics', budget: '₹800', postedTime: '1 day ago', imageUrl: 'https://via.placeholder.com/600x400?text=Calculator+Image', user: { name: 'Priya Singh' } },
    { id: 3, userId: 2, name: 'Used Lab Coat - Size M', description: 'Seeking a clean, used lab coat in size Medium for lab sessions.', category: 'Lab Equipment', budget: '₹200', postedTime: '3 days ago', imageUrl: 'https://via.placeholder.com/600x400?text=Lab+Coat+Image', user: { name: 'Amit Kumar' } },
    { id: 4, userId: 3, name: 'Bicycle for daily commute', description: 'Looking for a sturdy bicycle for daily travel around campus.', category: 'Bicycle', budget: '₹2000', postedTime: '5 days ago', imageUrl: 'https://via.placeholder.com/600x400?text=Bicycle+Image', user: { name: 'Sneha Patel' } },
];

export const initialOffers = [
    { id: 101, itemId: 1, userId: 2, user: { name: 'Priya Singh' }, message: "I have the 8th edition of this textbook, you can have it for ₹300." },
    { id: 102, itemId: 1, userId: 3, user: { name: 'Amit Kumar' }, message: "I have one I'm not using. It's in great condition. Can meet near the library." },
    { id: 103, itemId: 2, userId: 1, user: { name: 'Rohan Sharma' }, message: "I have an extra Casio calculator, are you interested?" },
];