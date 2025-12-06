import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export default function HomePage() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xs w-full p-8 space-y-6 text-center border rounded-lg  border-gray-300 ">
        <div className="flex items-center flex-col">
          <FcGoogle size={48} />
          <button
            className="border border-gray-300 py-1 px-6 mt-2 rounded-lg cursor-pointer hover:shadow-2xl transition-all ease-in-out"
            onClick={handleGoogleLogin}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}
