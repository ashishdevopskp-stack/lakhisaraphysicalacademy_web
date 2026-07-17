import { adminLogin } from '@/app/lib/action/auth'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-colors">
        <h1 className="text-xl font-semibold mb-1 text-center text-gray-900 dark:text-white">Admin Access</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-6">Authorized personnel only</p>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form action={adminLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Email</label>
            <input
              id="email" name="email" type="email" required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Password</label>
            <input
              id="password" name="password" type="password" required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black rounded-md py-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  )
}