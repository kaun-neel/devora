<script setup>
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display pb-20">
    <main class="max-w-[1000px] mx-auto px-4 py-24 space-y-10">
      
      <!-- Profile Header -->
      <div class="bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-brutal-lg overflow-hidden">
        <div class="h-40 bg-primary border-b-4 border-black dark:border-white"></div>
        <div class="px-8 pb-10 flex flex-col items-center sm:items-start sm:flex-row gap-8 -mt-16">
          <div class="relative">
            <div class="w-40 h-40 border-4 border-black dark:border-white bg-slate-200 overflow-hidden shadow-brutal">
              <img class="w-full h-full object-cover" data-alt="Large user avatar in circle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOe3bq5838i68TorHgXwmHO5VREVTe5vcNucilhzkIL2ZfdUhV-U9CqW5j1Q9wTR29ql8xnrwK4QUKC75UHEtqtex_Zymx_5xZRxK3w-LGLav-0ZQz6E5oI38cW02-SH-blMHaUR9fvgMC5vTCvOHZBGkiJl1syd_Z4wTJvX4hE1aZN9PMeyx0X5V5Mz7FWgVpyNlaRBOFtxIAc6P2vPOxwnXcG4e4pb2T-2TRJxlrAviUySG8hRFChycq895lOAgBvIRmlFg8mZ8"/>
            </div>
            <div class="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-black dark:border-white"></div>
          </div>
          
          <div class="mt-20 flex-1 text-center sm:text-left">
            <h1 class="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Alex Chen</h1>
            <p class="text-slate-600 dark:text-slate-400 font-bold text-lg mt-1 uppercase tracking-tight">Full-stack Developer • Member since Jan 2024</p>
            <div class="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
              <span class="px-4 py-2 border-2 border-black dark:border-white bg-primary text-white text-xs font-black uppercase tracking-widest shadow-brutal-sm">Expert Debugger</span>
              <span class="px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-slate-800 text-black dark:text-white text-xs font-black uppercase tracking-widest shadow-brutal-sm">Python Enthusiast</span>
            </div>
          </div>
          
          <div class="mt-20">
            <RouterLink to="/profile/edit" class="inline-block px-8 py-3 bg-white dark:bg-slate-800 text-black dark:text-white border-4 border-black dark:border-white font-black uppercase tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-brutal">Edit Profile</RouterLink>
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-slate-900 p-8 border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Inquiries Run</p>
          <p class="text-4xl font-black mt-2 text-primary">1,284</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-8 border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Code Debugs</p>
          <p class="text-4xl font-black mt-2 text-primary">452</p>
        </div>
        <div class="bg-primary p-8 border-4 border-black dark:border-white shadow-brutal">
          <p class="text-white text-xs font-black uppercase tracking-widest">Day Streak</p>
          <p class="text-4xl font-black mt-2 text-white">7 🔥</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-8 border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Days Active</p>
          <p class="text-4xl font-black mt-2 text-primary">128</p>
        </div>
      </div>

      <!-- Streak Section -->
      <div class="bg-white dark:bg-slate-900 p-10 border-4 border-black dark:border-white shadow-brutal-lg">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 class="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">7 day streak 🔥</h2>
            <p class="text-slate-600 dark:text-slate-400 mt-4 font-bold text-lg max-w-lg">Personal best! Keep the momentum going to unlock the 'Consistency' badge.</p>
          </div>
          
          <div class="flex gap-4">
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Mon</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Tue</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Wed</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Thu</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Fri</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Sat</span>
              <div class="w-12 h-12 bg-primary border-2 border-black dark:border-white flex items-center justify-center text-white shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">check</span>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-black text-black dark:text-white uppercase">Sun</span>
              <div class="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-black dark:border-white flex items-center justify-center text-slate-300 dark:text-slate-600 shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">local_fire_department</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Language Usage -->
        <div class="bg-white dark:bg-slate-900 p-8 border-4 border-black dark:border-white shadow-brutal">
          <h3 class="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">terminal</span>
            Language Usage
          </h3>
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-black uppercase tracking-widest text-black dark:text-white">
                <span>Python</span>
                <span>42%</span>
              </div>
              <div class="h-6 w-full bg-white dark:bg-slate-800 border-2 border-black dark:border-white overflow-hidden">
                <div class="h-full bg-primary border-r-2 border-black dark:border-white w-[42%]"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-black uppercase tracking-widest text-black dark:text-white">
                <span>JavaScript</span>
                <span>28%</span>
              </div>
              <div class="h-6 w-full bg-white dark:bg-slate-800 border-2 border-black dark:border-white overflow-hidden">
                <div class="h-full bg-primary/80 border-r-2 border-black dark:border-white w-[28%]"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-black uppercase tracking-widest text-black dark:text-white">
                <span>TypeScript</span>
                <span>15%</span>
              </div>
              <div class="h-6 w-full bg-white dark:bg-slate-800 border-2 border-black dark:border-white overflow-hidden">
                <div class="h-full bg-primary/60 border-r-2 border-black dark:border-white w-[15%]"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-black uppercase tracking-widest text-black dark:text-white">
                <span>SQL</span>
                <span>8%</span>
              </div>
              <div class="h-6 w-full bg-white dark:bg-slate-800 border-2 border-black dark:border-white overflow-hidden">
                <div class="h-full bg-primary/40 border-r-2 border-black dark:border-white w-[8%]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Badges Section -->
        <div class="bg-white dark:bg-slate-900 p-8 border-4 border-black dark:border-white shadow-brutal flex flex-col">
          <h3 class="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">military_tech</span>
            Badges Earned
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1">
            
            <!-- Badge 1 -->
            <div class="flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white bg-amber-100 dark:bg-amber-900/30 shadow-brutal-sm hover:-translate-y-1 transition-transform group">
              <div class="w-16 h-16 rounded-full bg-amber-400 border-4 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-black font-black text-3xl">emoji_events</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-black dark:text-white">Top 1% Coder</p>
            </div>

            <!-- Badge 2 -->
            <div class="flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white bg-blue-100 dark:bg-blue-900/30 shadow-brutal-sm hover:-translate-y-1 transition-transform group">
              <div class="w-16 h-16 rounded-full bg-blue-400 border-4 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-black font-black text-3xl">bug_report</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-black dark:text-white">Bug Squasher</p>
            </div>

            <!-- Badge 3 -->
            <div class="flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white bg-green-100 dark:bg-green-900/30 shadow-brutal-sm hover:-translate-y-1 transition-transform group">
              <div class="w-16 h-16 rounded-full bg-green-400 border-4 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-black font-black text-3xl">bolt</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-black dark:text-white">Fast Responder</p>
            </div>

            <!-- Badge 4 -->
            <div class="flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white bg-purple-100 dark:bg-purple-900/30 shadow-brutal-sm hover:-translate-y-1 transition-transform group">
              <div class="w-16 h-16 rounded-full bg-primary border-4 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-white font-black text-3xl">school</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-black dark:text-white">Mentor</p>
            </div>

            <!-- Badge 5 -->
            <div class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center mb-3 opacity-50">
                <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 font-black text-3xl">lock</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-slate-400 dark:text-slate-500">Locked</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-brutal-lg overflow-hidden">
        <div class="px-8 py-6 border-b-4 border-black dark:border-white flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 class="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">history</span>
            Recent Activity
          </h3>
          <button class="text-xs font-black text-primary hover:underline uppercase tracking-widest">View All</button>
        </div>
        
        <div class="divide-y-2 divide-black dark:divide-white">
          <div class="p-6 flex items-center justify-between hover:bg-primary/10 transition-colors">
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 border-2 border-black dark:border-white bg-blue-400 text-black flex items-center justify-center shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">code</span>
              </div>
              <div>
                <p class="text-base font-black uppercase">Ran Inquiry: User Authentication Flow</p>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-tight">Node.js • Express • PostgreSQL</p>
              </div>
            </div>
            <p class="text-xs font-black text-slate-500 uppercase">2 hours ago</p>
          </div>
          
          <div class="p-6 flex items-center justify-between hover:bg-primary/10 transition-colors">
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 border-2 border-black dark:border-white bg-red-400 text-black flex items-center justify-center shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">bug_report</span>
              </div>
              <div>
                <p class="text-base font-black uppercase">Debugger: Resolved Null Pointer in MainController</p>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-tight">Python • Django</p>
              </div>
            </div>
            <p class="text-xs font-black text-slate-500 uppercase">5 hours ago</p>
          </div>
          
          <div class="p-6 flex items-center justify-between hover:bg-primary/10 transition-colors">
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 border-2 border-black dark:border-white bg-green-400 text-black flex items-center justify-center shadow-brutal-sm">
                <span class="material-symbols-outlined font-black">dataset</span>
              </div>
              <div>
                <p class="text-base font-black uppercase">New Dataset: Public API Endpoints v2</p>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-tight">Documentation • JSON</p>
              </div>
            </div>
            <p class="text-xs font-black text-slate-500 uppercase">Yesterday</p>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-lg { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-sm { box-shadow: 2px 2px 0px 0px rgba(0,0,0,1); }
.dark .shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(255,255,255,0.2); }
.dark .shadow-brutal-lg { box-shadow: 8px 8px 0px 0px rgba(255,255,255,0.2); }
.dark .shadow-brutal-sm { box-shadow: 2px 2px 0px 0px rgba(255,255,255,0.2); }

</style>
