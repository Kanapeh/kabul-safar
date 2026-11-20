"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, LockKeyhole, User } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("نام کاربری یا رمز عبور اشتباه است.");
        return;
      }
      const next = searchParams.get("next");
      // only allow internal admin redirects
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-ink">
          نام کاربری
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            dir="ltr"
            required
            className="w-full rounded-xl border border-line bg-white py-3 pe-3 ps-10 text-ink outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
          رمز عبور
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            required
            className="w-full rounded-xl border border-line bg-white py-3 pe-11 ps-10 text-ink outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
            className="absolute end-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-canvas"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading || !username || !password}
        className="ks-btn ks-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        ورود به پیشخوان
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-[24rem]">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/images/Kabul%20safar%20logo.jpg"
            alt="Kabul Safar"
            width={72}
            height={72}
            className="h-16 w-16 rounded-2xl border border-line bg-white object-contain"
          />
          <h1 className="mt-4 text-xl font-extrabold text-ink">ورود به پیشخوان کابل سفر</h1>
          <p className="mt-1 text-sm text-muted">مدیریت نوشته‌ها و وبلاگ</p>
        </div>
        <div className="ks-card p-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-teal">← بازگشت به سایت</Link>
        </p>
      </div>
    </div>
  );
}
