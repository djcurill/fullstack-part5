import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import BlogForm from '../blogform';

describe('BlogForm', () => {
  let setShowModal = null;
  let addBlog = null;

  beforeEach(() => {
    setShowModal = jest.fn();
    addBlog = jest.fn();
  });

  afterEach(() => {
    setShowModal = null;
    addBlog = null;
  });

  describe('given a new blog', () => {
    it.only('calls the addBlog event handler once', () => {
      const component = render(<BlogForm setShowModal={setShowModal} addBlog={addBlog} />);
      const form = component.container.querySelector('.blogform');
      const titleInput = component.container.querySelector('#blogtitle');
      const authorInput = component.container.querySelector('#blog-author');

      fireEvent.change(titleInput, { target: { value: 'blog one' } });
      fireEvent.change(authorInput, { target: { value: 'uno' } });
      fireEvent.submit(form);

      expect(addBlog.mock.calls).toHaveLength(1);
      expect(addBlog.mock.calls[0][0]).toEqual({ title: 'blog one', author: 'uno', url: '' });
    });
  });
});
