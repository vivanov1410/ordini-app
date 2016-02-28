import React from 'react'

function Footer() {
  const year = new Date().getFullYear()

  return (
   <div className="footer">
     <p>&copy; {year} &middot; Ordini &middot; Exilium Studio Inc.</p>
   </div>
 )
}

export default Footer

