var keys = [
// menu links
{ key: 'h', link: '.topBar a[title=]:contains(Coconut center)', help_message: 'Ga naar Coconut Center' },
{ key: 'n', link: '.topBar a[title=]:contains(nieuws & info)', help_message: 'Ga naar Nieuws & Info' },
{ key: 'f', link: '.topBar a[title=]:contains(interne forums)', help_message: 'Ga naar Forum' },
{ key: 'g', link: '.topBar a[title=]:contains(groepen)', help_message: 'Ga naar Groepen' },
{ key: 'p', link: '.topBar a[title=]:contains(profielen)', help_message: 'Ga naar Profielen' },
{ key: 'o', link: '.topBar a[title=]:contains(opleidingen)', help_message: 'Ga naar Opleidingen' },
{ key: 'w', link: '.topBar a[title=]:contains(wiki)', help_message: 'Ga naar Wiki' },
{ key: 'u', link: '.topBar a[title=]:contains(LAS Urenregistratie)', help_message: 'Ga naar LAS' },
{ key: 'z', link: '.topBar a[title=]:contains(Zarafa)', help_message: 'Ga naar Webmail' },

// content links
{ key: 'c', link: '.commonContentActionButton > a', help_message: 'Schrijf een nieuw bericht' }, // c + a: content action

// url
{ key: 'shift+f', url: '/forum/categories/show_non_read', help_message: 'Toon ongelezen forum berichten' },

// focus
{ key: '/', focus: '#global_search_criteria', help_message: 'Zoeken' },
{ key: 'c', focus: '#newMsgTextArea-1', help_message: 'Schrijf een nieuw bericht' },

// click
{ key: 'shift+c', click: '.chatContainer .bottomTab', help_message: 'Open/sluit Chat lijst' },
{ key: 'r', click: '.reloadButton', help_message: 'Herlaad alle widgets' },

// actions
{ key: 'shift+/ ?', action: 'help', help_message: 'Open help' },

// keyboard navigation forum
{ key: 'j', down: '.branchContainer', help_message: 'Volgende forum (bericht)' },
{ key: 'k', up: '.branchContainer', help_message: 'Vorige forum (bericht)' },
{ key: 'v', click: '.branchContainer.selected .branchTitle a', help_message: 'Open forum (bericht)' },
{ key: 'shift+v', click: '.branchContainer.selected .branchDescription a', help_message: 'Ga naar laatste reactie' },
// keyboard navigation gateway
{ key: 'j', down: '.messageBlock > div:first-child', help_message: 'Volgend netwerkbericht' },
{ key: 'k', up: '.messageBlock > div:first-child', help_message: 'Vorig netwerkbericht' },
{ key: 'v', click: '.messageBlock > div.selected + div.msgReactions:first a', help_message: 'Toon/Verberg reacties' },
{ key: 'return', focus: '.messageBlock > div.selected + div.msgReactions + div.msgReactions + div.msgComments div.commentForm div.commentFormContent textarea', help_message: 'Schrijf reactie' },
// keyboard navigation blog
{ key: 'j', down: '.commonContentPost .postTitle', help_message: 'Volgend nieuwsbericht' },
{ key: 'k', up: '.commonContentPost .postTitle', help_message: 'Vorig nieuwsbericht' },
{ key: 'v', click: '.commonContentPost .postTitle.selected a', help_message: 'Open nieuwsbericht' },
];
