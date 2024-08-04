function ProfileCard ({user}: any) {
    return (
        <div className="flex flex-col w-96 h-96 items-center justify-center rounded-xl bg-opacity-15 border border-default shadow">
            <div className="flex flex-col items-center justify-center p-5">
                Username: {user?.name}
            </div>

        </div>
)}

export default ProfileCard;