import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { MdEditDocument } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import axios from '../config/axiosConfig';

const Employees = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [employee, setEmployee] = useState({})
    const [employees, setEmployees] = useState([])
    const [empId,setEmpId] = useState('')

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        setIsOpen(false);
        axios.post('/addEmployee', data).then(() => {
            console.log('sucess');

        })
        reset();
    };

    const handleDelete = (id) => {
        axios.delete(`/deleteEmployee/${id}`).then(() => {
            console.log('employee deleted')
        })
    }

    const handleChange = (id) => {
        const employ = employees.filter((emp) => emp._id === id)
        setEmployee(employ)
        setEmpId(id)
        setEditModalOpen(true)
    }

    const handleEdit=(data)=>{
        axios.put(`/update/${empId}`,data).then(()=>{
            setEditModalOpen(false)
            setEmpId(null)
        })
    }

    useEffect(() => {
        axios.get('/').then((response) => {
            setEmployees(response.data)
        })
    }, [onSubmit])

    return (
        <div>
            <div className="flex justify-between p-6">
                <h1 className='font-semi-bold text-2xl'>Employee</h1>
                <button onClick={() => setIsOpen(true)} className='btn btn-primary'>Add</button>
            </div>
            <div className="p-6 flex flex-wrap gap-6 justify-center">
                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col text-center"
                    >
                        <div className='justify-center flex'>
                            <img
                                src={employee.profileImage}
                                alt={`${employee.firstName[0]} ${employee.lastName[0]}`}
                                className="w-24 bg-gray-400 font-extrabold text-4xl h-24 rounded-full object-cover mb-2"
                            />
                        </div>
                        <h3 className="text-lg font-semibold">
                            {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-xs mb-2 text-gray-500">{employee.email}</p>

                        <div className="flex justify-around p-2">
                            <i onClick={() => handleChange(employee._id)} className='text-blue-600' ><MdEditDocument /></i>
                            <i className='text-gray-600'><FaEye /></i>
                            <i onClick={() => handleDelete(employee._id)} className='text-red-500'><AiFillDelete /></i>
                        </div>

                        <hr />

                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-sm font-medium mt-2">{employee.department}</p>
                                <p className='text-xs text-gray-500'>Department</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium mt-2">{employee.designation}</p>
                                <p className='text-xs text-gray-500'>Designation</p>
                            </div>

                            <div className='mt-3'>
                                <p className="text-sm font-medium mt-2">{employee.dateOfJoining}</p>
                                <p className='text-xs text-gray-500'>Date of Joining</p>
                            </div>
                            <div className='mt-3'>
                                <p className="text-sm text-green-700 font-medium mt-2">{employee.salary}</p>
                                <p className='text-xs text-gray-500'>Salary</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">

                        <h1 className='text-center font-bold text-lg pb-1'>Add Employee</h1>
                        <hr className='pb-3' />
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">First Name</label>
                                    <input
                                        type="text"
                                        {...register("firstName", { required: "First Name is required" })}
                                        className="w-full mt-3 border-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 font-mono text-xs">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Last Name</label>
                                    <input
                                        type="text"
                                        {...register("lastName", { required: "Last Name is required" })}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 font-mono text-xs">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className='relative'>
                                <label className="block text-sm px-1 ms-3 bg-white absolute">Email</label>
                                <input
                                    type="text"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full mt-3 border-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.email && (
                                    <p className="text-red-500 font-mono text-xs">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Department</label>
                                    <input
                                        type="text"
                                        {...register("department", { required: "Department is required" })}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                    {errors.department && (
                                        <p className="text-red-500 font-mono text-xs">{errors.department.message}</p>
                                    )}
                                </div>


                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Designation</label>
                                    <input
                                        type="text"
                                        {...register("designation", { required: "Designation is required" })}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                    {errors.designation && (
                                        <p className="text-red-500 font-mono text-xs">{errors.designation.message}</p>
                                    )}
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Date of Joining</label>
                                    <input
                                        type="date"
                                        {...register("dateOfJoining", { required: "Date of Joining is required" })}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                    {errors.dateOfJoining && (
                                        <p className="text-red-500 font-mono text-xs">{errors.dateOfJoining.message}</p>
                                    )}
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Salary</label>
                                    <input
                                        type="number"
                                        {...register("salary", { required: "Salary is required" })}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                    {errors.salary && (
                                        <p className="text-red-500 font-mono text-xs">{errors.salary.message}</p>
                                    )}
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-sm">Profile Image</label>
                                <input
                                    type="file"
                                    {...register("profileImage")}
                                    className="w-full p-2 border rounded border-black"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">

                        <h1 className='text-center font-bold text-lg pb-1'>Edit Employee</h1>
                        <hr className='pb-3' />
                        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">First Name</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                        className="w-full mt-3 border-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Last Name</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                </div>
                            </div>

                            <div className='relative'>
                                <label className="block text-sm px-1 ms-3 bg-white absolute">Email</label>
                                <input
                                    type="text"
                                    {...register("email")}
                                    className="w-full mt-3 border-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Department</label>
                                    <input
                                        type="text"
                                        {...register("department")}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                </div>


                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Designation</label>
                                    <input
                                        type="text"
                                        {...register("designation")}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Date of Joining</label>
                                    <input
                                        type="date"
                                        {...register("dateOfJoining")}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                </div>

                                <div className='relative'>
                                    <label className="block text-sm px-1 ms-3 bg-white absolute">Salary</label>
                                    <input
                                        type="number"
                                        {...register("salary")}
                                        defaultValue={employee.salary}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 border-black"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-sm">Profile Image</label>
                                <input
                                    type="file"
                                    {...register("profileImage")}
                                    className="w-full p-2 border rounded border-black"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
