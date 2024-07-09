import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
describe('Book component rendering', () => {
  let handleSearch = jest.fn();
  let setSearchQuery = jest.fn();
  let searchQueryText = 'Test';

  test('renders search bar component', () => {
    render(<SearchBar searchQuery={searchQueryText} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />)
    const placeHolderText = screen.getByPlaceholderText('Search by title...');
    expect(placeHolderText.value).toBe('Test');

  });

  test('Test query change', () => {
    render(<SearchBar searchQuery={searchQueryText} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />)

    const placeHolderText = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(placeHolderText, { target: { value: 'testqery' } });
    expect(setSearchQuery).toHaveBeenCalled();
  });

  test('test handle search Button', () => {
    render(<SearchBar searchQuery={searchQueryText} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />)
    fireEvent.click(screen.getByText(/Search/i));
    expect(handleSearch).toHaveBeenCalled();
  });
});
