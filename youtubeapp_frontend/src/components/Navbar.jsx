import React from 'react'
import '../assets/mylogo.png'

export default function Navbar() {
  return (
    <div>
      <nav class="flex items-center justify-between bg-white shadow-md pl-15">
    
      <div class="flex items-center space-x-2">
        <img src="src\assets\mylogo.png" alt="Logo" class="h-18" />
    </div>
    
    
    <div class="flex-1 mx-4 px-60">
        <input type="text" placeholder="Search..." class="w-full p-1.5 border border-gray-300 rounded-md" />
    </div>
    
    
    <div class="space-x-4 pr-15">
        <button class="px-4 py-2 border border-gray-300 rounded-md">Log In</button>
        <button class="px-4 py-2 text-white bg-purple-600 rounded-md">Sign Up</button>
    </div>
</nav>
    </div>
  )
}
