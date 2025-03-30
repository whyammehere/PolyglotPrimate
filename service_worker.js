chrome.runtime.onInstalled.addListener(() => {
    // Ensure the side panel can be opened by clicking the extension icon
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  
    // Optional: configure default side panel behavior
    chrome.sidePanel.setOptions({
      path: "popup.html",
      enabled: true
    });
});

// Fallback: Open the side panel manually when user clicks the extension icon
chrome.action.onClicked.addListener(async (tab) => {
    await chrome.sidePanel.open({ tabId: tab.id });
});