import React from 'react';
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fetchData, postData } from '../../apiService';
import BookList from './BookList';
jest.mock('../../apiService');


describe('BookList Component', () => {
    let store;

    beforeEach(() => {
        const mockStore = configureMockStore();
        store = mockStore({
            shoppingCart: {
                shoppingCart: [],
                cartId: 0,
                totalPrice: 0,
            }, user: {
                userId: 1,
                token: 'test',
                userName: 'testName'
            }
        });
        fetchData.mockImplementation((url,header) => {
            if (url == '/v1/carts/getShoppingCart?userId=1') {

                return Promise.resolve({
                    shoppingCartId: 1,
                    totalPrice: 0,
                    shoppingCartItems: []
                });
            } 
            else if (url == '/v1/books/search?searchCriteria=&pageNo=0') {
                return Promise.resolve({
                    "totalElements": 43,
                    "totalPages": 5,
                    "size": 10,
                    "content": [
                        {
                            "id": 1,
                            "title": "Harry Potter and the Sorcerer's Stone",
                            "author": {
                                "id": 1,
                                "name": "J.K. Rowling"
                            },
                            "unitPrice": 19.99,
                            "genres": "Fantasy"
                        },
                        {
                            "id": 2,
                            "title": "The Hobbit",
                            "author": {
                                "id": 2,
                                "name": "J.R.R. Tolkien"
                            },
                            "unitPrice": 14.99,
                            "genres": "Fantasy"
                        },
                        {
                            "id": 3,
                            "title": "The Lord of the Rings",
                            "author": {
                                "id": 2,
                                "name": "J.R.R. Tolkien"
                            },
                            "unitPrice": 29.99,
                            "genres": "Fantasy"
                        },
                        {
                            "id": 4,
                            "title": "The Hunger Games",
                            "author": {
                                "id": 3,
                                "name": "Suzanne Collins"
                            },
                            "unitPrice": 12.99,
                            "genres": "Science Fiction"
                        },
                        {
                            "id": 5,
                            "title": "The Da Vinci Code",
                            "author": {
                                "id": 4,
                                "name": "Dan Brown"
                            },
                            "unitPrice": 15.99,
                            "genres": "Mystery"
                        },
                        {
                            "id": 6,
                            "title": "The Catcher in the Rye",
                            "author": {
                                "id": 5,
                                "name": "J.D. Salinger"
                            },
                            "unitPrice": 9.99,
                            "genres": "Classic"
                        },
                        {
                            "id": 7,
                            "title": "To Kill a Mockingbird",
                            "author": {
                                "id": 6,
                                "name": "Harper Lee"
                            },
                            "unitPrice": 11.99,
                            "genres": "Classic"
                        },
                        {
                            "id": 8,
                            "title": "1984",
                            "author": {
                                "id": 7,
                                "name": "George Orwell"
                            },
                            "unitPrice": 10.99,
                            "genres": "Dystopian"
                        },
                        {
                            "id": 9,
                            "title": "Pride and Prejudice",
                            "author": {
                                "id": 8,
                                "name": "Jane Austen"
                            },
                            "unitPrice": 8.99,
                            "genres": "Romance"
                        },
                        {
                            "id": 10,
                            "title": "The Great Gatsby",
                            "author": {
                                "id": 9,
                                "name": "F. Scott Fitzgerald"
                            },
                            "unitPrice": 7.99,
                            "genres": "Classic"
                        }
                    ],
                    "number": 0,
                    "sort": {
                        "empty": true,
                        "unsorted": true,
                        "sorted": false
                    },
                    "numberOfElements": 10,
                    "pageable": {
                        "pageNumber": 0,
                        "pageSize": 10,
                        "sort": {
                            "empty": true,
                            "unsorted": true,
                            "sorted": false
                        },
                        "offset": 0,
                        "unpaged": false,
                        "paged": true
                    },
                    "first": true,
                    "last": false,
                    "empty": false
                });
            }
         
            return Promise.reject(new Error('not found'));
        });
    });

    describe('Pagination', () => {
        test('should call fetch 2 times to get shopping cart and books', async () => {
            render(<Provider store={store}><BookList /></Provider>);
            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2)
            });
        });
    });

    describe('Pagination', () => {
        test('should render prev and next page', async () => {
            render(<Provider store={store}><BookList /></Provider>);
            await waitFor(() => {
            expect(screen.getByText('Page 1 of 5')).toBeInTheDocument(); 
            });

        });
    });

    describe('Pagination', () => {
        test('click search button should rerender the component', async () => {
            render(<Provider store={store}><BookList /></Provider>);

            fireEvent.click(screen.getByText(/Search/i));
            await waitFor(() => {
                expect(fetchData).toHaveBeenCalled();
            });

        });
    });


});