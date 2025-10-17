import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

function TodoForm({ fetchTodos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    priority: 'medium',
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/todos/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error fetching todo:', error));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    if (id) {
      await axios.put(`http://localhost:5000/api/todos/${id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/todos', formData);
    }
    navigate('/view');
    setTimeout(fetchTodos, 200); 
  } catch (error) {
    console.error('Error saving todo:', error);
  }
};


  return (
    <div className="container mt-5">
      <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
        <div className="card shadow p-4 rounded-4 border-0">
          <h2 className="text-center mb-4 fw-bold"> {id ? 'Edit To-Do' : 'Add To-Do'}  <FontAwesomeIcon icon={faBookBookmark}/> </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{color:"brown"}}>Task Name</label>
              <input type="text" name="name" className="form-control" placeholder="Enter task name"value={formData.name} onChange={handleChange} required/>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" style={{color:"brown"}}>Description</label>
              <textarea name="description" className="form-control" placeholder="Add more task details" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{color:"brown"}}>Start Date</label>
                <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{color:"brown"}}>End Date</label>
                <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange}/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{color:"brown"}}>Progress Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange} >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{color:"brown"}}>Priority Level</label>
                <select name="priority" className="form-select" value={formData.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" onClick={() => navigate(`/view`)} className="btn btn-outline-danger btn-lg">
                 {id ? 'Update Task' : 'Add Task'} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
  
}
export default TodoForm;