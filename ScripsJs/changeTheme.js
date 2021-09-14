function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
   if (localStorage.getItem('theme') === 'dark-mode'){
       setTheme('');
   } else {
       setTheme('dark-mode');
   }
}
// Immediately invoked function to set the theme on initial load
(function () {
   if (localStorage.getItem('theme') === 'dark-mode') {
       setTheme('dark-mode');
   } else {
       setTheme("");
   }
})();