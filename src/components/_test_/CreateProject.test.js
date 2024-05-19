import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../util/fetchData';
import CreateProject from '../Modal_Components/CreateProject';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../util/fetchData', () => ({
  createProject: jest.fn(),
}));

describe('CreateProject Component', () => {
  const closeModalMock = jest.fn();
  const navigateMock = jest.fn();
  useNavigate.mockReturnValue(navigateMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateProject component', () => {
    render(<CreateProject closeModal={closeModalMock} />);
    expect(screen.getByTestId('header')).toHaveTextContent('Create New Project');
  });

  test('handles input changes', () => {
    render(<CreateProject closeModal={closeModalMock} />);

    const titleInput = screen.getByTestId('title-input');
    fireEvent.change(titleInput, { target: { value: 'Test Project' } });
    expect(titleInput.value).toBe('Test Project');

    const descriptionInput = screen.getByTestId('description-input');
    fireEvent.change(descriptionInput, { target: { value: 'This is a test project' } });
    expect(descriptionInput.value).toBe('This is a test project');
  });

  test('handles select changes and adds roles', () => {
    render(<CreateProject closeModal={closeModalMock} />);

    const select = screen.getByTestId('roles-select');

    fireEvent.change(select, { target: { value: 'Frontend Developer' } });
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'Backend Developer' } });
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'UI/UX Designer' } });
    expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();
  });

  test('creates a project and navigates to profile page', async () => {
    createProject.mockResolvedValue({ data: { message: 'Project created successfully' } });

    render(<CreateProject closeModal={closeModalMock} />);

    const titleInput = screen.getByTestId('title-input');
    const descriptionInput = screen.getByTestId('description-input');
    const createButton = screen.getByTestId('create-button');

    fireEvent.change(titleInput, { target: { value: 'Test Project' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test project' } });
    fireEvent.click(createButton);

    await waitFor(() =>
      expect(createProject).toHaveBeenCalledWith({
        title: 'Test Project',
        description: 'This is a test project',
        rolesNeeded: [],
      }),
    );

    await waitFor(() => expect(closeModalMock).toHaveBeenCalled());
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/profile'));
  });

  test('displays error message on project creation failure', async () => {
    createProject.mockRejectedValue({
      response: { data: { message: 'Error creating project' } },
    });

    render(<CreateProject closeModal={closeModalMock} />);

    const titleInput = screen.getByTestId('title-input');
    const descriptionInput = screen.getByTestId('description-input');
    const createButton = screen.getByTestId('create-button');

    fireEvent.change(titleInput, { target: { value: 'Test Project' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test project' } });
    fireEvent.click(createButton);

    await waitFor(() =>
      expect(createProject).toHaveBeenCalledWith({
        title: 'Test Project',
        description: 'This is a test project',
        rolesNeeded: [],
      }),
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Error creating project');
  });
});
