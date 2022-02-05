import React from 'react'

const Footer = () => {

  return (
    <>
      <footer className={'app-footer'}>
        <div className={'app-footer-right'}>
        &copy; {new Date().getFullYear()}{' '}
          <a href="http://www.hwt.rs">
            {'Design Tim'}
          </a>
        </div>
      </footer>
      <footer className={'app-footer-mobile'}> </footer>
    </>
  )
}

export default Footer
