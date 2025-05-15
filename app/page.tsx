import { UserButton } from '@/components/UserButton';

export default function Page() {
  return (
    <div className="flex h-screen bg-white">
      <div className="absolute top-4 left-4 bg-gray-200 p-2 rounded">
        <span className="text-black font-bold">Project Ideation Portal</span>
      </div>
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex space-x-3"></div>
      </div>
    </div>
  );
}
