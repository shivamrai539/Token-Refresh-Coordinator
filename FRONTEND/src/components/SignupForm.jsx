import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignupForm = () => {
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const success = await signup(
                formData.name,
                formData.email,
                formData.password,
                formData.role
            );
            if (!success) setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-6">
            <div className="w-[560px] h-[560px] bg-white border border-zinc-200 rounded p-12 flex flex-col justify-between">

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                        Create Account
                    </h2>
                    <p className="text-sm text-zinc-500">
                        Keep an eye on your token !!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-600">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-zinc-600">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-zinc-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <div className="flex justify-between items-center text-sm text-zinc-500">
                    <span>Secure • Minimal • Reliable</span>
                    <Link
                        to="/login"
                        className="hover:text-zinc-900 transition"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignupForm;