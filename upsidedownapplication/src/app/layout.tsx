import React from 'react';
import './globals.css'; 

export const metadata = {
  title: 'Mundo Invertido',
  description: 'Application developed to Advanced Web Development class',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>{children}</body>
    </html>
  )
}
