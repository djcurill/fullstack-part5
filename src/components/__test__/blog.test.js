import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import { unmountComponentAtNode } from 'react-dom';
import Blog from '../blog';

describe('Blog component', () => {
  let container = null;
  let updateMock = null;
  let deleteMock = null;

  const showDetails = (component) => {
    const button = component.getByTestId('toggle');
    fireEvent.click(button);
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    updateMock = jest.fn();
    deleteMock = jest.fn();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    updateMock = null;
    deleteMock = null;
  });

  describe('when details are hidden', () => {
    it('shows the blog title', () => {
      const blog = { title: 'Blog one', author: 'uno' };
      const component = render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      const header = component.getByRole('heading');
      expect(header).toHaveTextContent(blog.title);
    });

    it('does not show blog details', () => {
      const blog = { title: 'Blog one', author: 'uno' };
      render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      const blogDetails = container.querySelector('blogdetails');
      expect(blogDetails).toBe(null);
    });
  });

  describe('when show details is activated', () => {
    it('blog details component is truthy', () => {
      const blog = { title: 'Blog one', author: 'uno', url: 'blog.com' };
      const component = render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      showDetails(component);
      const blogDetails = component.container.querySelector('.blogdetails');
      expect(blogDetails).toBeTruthy();
    });

    it('url info is not shown, if not provided', () => {
      const blog = { title: 'blog one', author: 'uno' };
      const component = render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      showDetails(component);
      const urlInfo = component.queryByTestId('urlInfo');
      expect(urlInfo).toBeNull();
    });

    it('likes are rendered correctly', () => {
      const blog = { title: 'blog one', author: 'uno', likes: 5 };
      const component = render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      showDetails(component);
      const likeCount = component.getByTestId('numLikes');
      expect(likeCount.textContent).toBe('Likes: 5');
    });
  });

  describe('When pressing the like button', () => {
    const triggerLikes = (component, n) => {
      const likeButton = component.container.querySelector('.like');
      for (let i = 0; i < n; i += 1) {
        fireEvent.click(likeButton);
      }
    };

    it('calls updateBlog correct number of times', () => {
      const blog = { title: 'blog one', author: 'uno', likes: 5 };
      const component = render(<Blog blog={blog} updateBlog={updateMock} deleteBlog={deleteMock} />, container);
      triggerLikes(component, 2);
      expect(updateMock.mock.calls).toHaveLength(2);
    });
  });
});
