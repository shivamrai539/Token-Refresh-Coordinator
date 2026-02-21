import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const success = await login(formData.email, formData.password);
            if (!success) setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-6">
            <div className="w-[520px] h-[520px] bg-white border border-zinc-200 rounded p-12 flex flex-col justify-between">

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-zinc-500">
                        Sign in to access your workspace.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

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
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-zinc-600">Password</label>
                            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 transition">
                                Forgot?
                            </a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="flex justify-between items-center text-sm text-zinc-500">
                    <span>Secure authentication</span>
                    <Link
                        to="/signup"
                        className="hover:text-zinc-900 transition"
                    >
                        Create account
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;