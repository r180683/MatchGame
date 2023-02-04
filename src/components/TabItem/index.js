import './index.css'

const TabItem = props => {
  const {tabDetails, activeTabId, updateActiveTab} = props
  const {displayText, tabId} = tabDetails
  const tabClassName = tabId === activeTabId ? 'active-tab' : 'inactive-tab'

  const updateTab = () => {
    updateActiveTab(tabId)
  }

  return (
    <li onClick={updateTab} className={tabClassName}>
      {displayText}
    </li>
  )
}

export default TabItem
