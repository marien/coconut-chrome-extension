var keys = [
// menu links
{ key: 'h', link: '.topBar a[title=]:contains(terminal center)' },
{ key: 'n', link: '.topBar a[title=]:contains(nieuws & info)' },
{ key: 'f', link: '.topBar a[title=]:contains(interne forums)' },
{ key: 'g', link: '.topBar a[title=]:contains(sociaal netwerk)' },
{ key: 'o', link: '.topBar a[title=]:contains(cursussen & trajecten)' },
{ key: 'w', link: '.topBar a[title=]:contains(interne wiki)' },
{ key: 'd', link: '.topBar a[title=]:contains(personeelsvereniging website)' },
{ key: 'u', link: '.topBar a[title=]:contains(LAS Urenregistratie)' },
{ key: 'z', link: '.topBar a[title=]:contains(Zarafa: E-mail & Agenda)' },
{ key: 'l', link: '.topBar a[title=]:contains(personeelsvereniging website)' },

// content links
{ key: 'c', link: '.commonContentActionButton > a' }, // c + a: content action

// url
{ key: 'shift+f', url: '/forum/categories/show_non_read' },

// focus
{ key: '/', focus: '#global_search_criteria' },
{ key: 'c', focus: '#newMsgTextArea-1' },

// click
{ key: 'shift+c', click: '.chatContainer .bottomTab' },
{ key: 'r', click: '.reloadButton' },

// actions
{ key: 'shift+/ ?', action: 'help' },

// keyboard navigation forum
{ key: 'j', down: '.branchContainer' },
{ key: 'k', up: '.branchContainer' },
{ key: 'v', click: '.branchContainer.selected .branchTitle a' },
{ key: 'shift+v', click: '.branchContainer.selected .branchDescription a' },
// keyboard navigation gateway
{ key: 'j', down: '.messageBlock > div:first-child' },
{ key: 'k', up: '.messageBlock > div:first-child' },
{ key: 'v', click: '.messageBlock > div.selected + div.msgReactions:first a' },
// keyboard navigation blog
{ key: 'j', down: '.commonContentPost .postTitle' },
{ key: 'k', up: '.commonContentPost .postTitle' },
{ key: 'v', click: '.commonContentPost .postTitle a' },
];
