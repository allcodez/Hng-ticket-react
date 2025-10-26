import LoginForm from "@/components/form/login";


const LoginPage = () => {
    return (
        <div className="flex min-h-screen px-[12px] py-[12px] text-black">
            <div className="flex flex-col w-full lg:w-[55%]">
                <LoginForm />
            </div>

            <div className="hidden lg:block lg:w-[45%] rounded-2xl" style={{ backgroundImage: `url("/login-bg.png")`, backgroundSize: "cover", backgroundPosition: "left" }}>
            </div>
        </div>
    )
};

export default LoginPage;
