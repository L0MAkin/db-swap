import React from 'react'

export function Email({ onClick }) {
  return (
    <svg onClick={onClick} width='90' height='90' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" fill="none" preserveAspectRatio="xMidYMid meet">
        <path d="M314.375 144H133.625L224 221.465L314.375 144Z" fill="#2A2B35"></path>
        <path d="M224 240C222.09 240 220.242 239.316 218.793 238.07L120 153.391V304H328V153.391L229.207 238.07C227.758 239.316 225.91 240 224 240Z" fill="#2A2B35"></path>
        <path d="M224 0C100.289 0 0 100.289 0 224C0 347.711 100.289 448 224 448C347.711 448 448 347.711 448 224C447.859 100.348 347.652 0.140625 224 0ZM344 312C344 316.418 340.418 320 336 320H112C107.582 320 104 316.418 104 312V136C104 131.582 107.582 128 112 128H336C340.418 128 344 131.582 344 136V312Z" fill="#2A2B35"></path>
    </svg>
  )
}
