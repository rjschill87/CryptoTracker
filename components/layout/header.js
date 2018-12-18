import { colors } from '../../tailwind'

export default ({ account }) => (
  <header>
    <div className='container'>
      <h3>CryptoTracker</h3>
    </div>
    <style jsx>{`
      header {
        background-color: ${colors.black};
        color: ${colors.greyLightest};
      }
    `}</style>
  </header>
)
