export default function NewsletterSignup() {
    return (
        <section className="mx-auto max-w-7xl rounded-3xl bg-[#d2ef9a] px-6 py-16 text-center text-black">
            <h2 className="mb-2 text-3xl font-bold">Sign Up And Get 10% Off</h2>
            <p className="mb-6 text-[#102e50]">Sign up for early sale access, new in, promotions and more</p>
            <form className="mx-auto flex max-w-xl overflow-hidden rounded-full bg-white">
                <div className="relative flex-1">
                    <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="w-full px-5 py-3 text-black placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <button type="submit" className="hover:bg-[#102e50]transition bg-[#102e50] px-6 font-semibold text-white">
                    SUBSCRIBE
                </button>
            </form>
        </section>
    );
}
