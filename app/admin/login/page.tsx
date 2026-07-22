import { adminLogin } from '@/app/lib/action/auth'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-xl font-semibold mb-1 text-center text-gray-900">Admin Access</h1>
        <p className="text-xs text-gray-500 text-center mb-6">Authorized personnel only</p>

        {error && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4"
          >
            {error}
          </p>
        )}

        <form action={adminLogin} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              autoFocus
              className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  )
}