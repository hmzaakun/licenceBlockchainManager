import React from "react";

const Create = () => {

    return (
        <div className="rounded-lg mx-auto max-w-xl p-8 lg:col-span-3 lg:p-12 lg:pt-24">
            <h2 className="text-3xl font-semibold text-center text-white">Create licence</h2>
            <form action="#" className="flex flex-col justify-between h-[60vh] mt-20">
                <div className="space-y-4">
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Name"
                        type="text"
                        id="name"
                    />
                    <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Description"
                        rows="8"
                        id="description"
                    ></textarea>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-800 file:cursor-pointer file:disabled:opacity-50 file:disabled:pointer-events-none" />
                    </label>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                        Send Enquiry
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Create;