export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-sm border">
        <h1 className="text-xl font-semibold mb-6 text-center">Sign In</h1>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form action="/login" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email" name="email" type="email" required
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password" name="password" type="password" required
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Admin?{' '}
          <a href="/admin/login" className="underline hover:text-black">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}