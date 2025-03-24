
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import photo from './photo.png';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-gray-100 py-4 shadow-sm">
            <div className="flex items-center justify-center">
                <div className="bg-white rounded-full shadow-lg px-8 py-4 flex items-center justify-between w-full max-w-4xl">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={photo} alt="Logo" className="h-10 w-10 object-cover" />
                            <h1 className="text-2xl font-bold">
 
                                <span className="text-purple-500">Job</span>
                                <span className="text-black">ify</span>
</h1>

                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        <ul className="flex font-medium items-center gap-6">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-[#6A38C2] transition">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-[#6A38C2] transition"> Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-[#6A38C2] transition">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-[#6A38C2] transition">Filter Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-[#6A38C2] transition">Find Talents</Link></li>
                                    <li><Link to="/aboutUs" className="hover:text-[#6A38C2] transition">About Us</Link></li>
                                </>
                            )}
                        </ul>

                        {/* Login/Logout */}
                        {!user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className="flex gap-2 items-center mb-4">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {user && user.role === 'student' && (
                                                <div className="flex items-center gap-2 cursor-pointer">
                                                    <User2 />
                                                    <Link to="/profile" className="hover:underline">View Profile</Link>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

