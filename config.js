var keys = [
// menu links
{ key: 'g;h', link: '.topBar a[title=]:contains(Coconut center)', help_message: 'Ga naar Coconut Center' },
{ key: 'g;n', link: '.topBar a[title=]:contains(nieuws & info)', help_message: 'Ga naar Nieuws & Info' },
{ key: 'g;f', link: '.topBar a[title=]:contains(interne forums)', help_message: 'Ga naar Forum' },
{ key: 'g;r', link: '.topBar a[title=]:contains(groepen)', help_message: 'Ga naar Groepen' },
{ key: 'g;p', link: '.topBar a[title=]:contains(profielen)', help_message: 'Ga naar Profielen' },
{ key: 'g;o', link: '.topBar a[title=]:contains(opleidingen)', help_message: 'Ga naar Opleidingen' },
{ key: 'g;w', link: '.topBar a[title=]:contains(wiki)', help_message: 'Ga naar Wiki' },
{ key: 'g;u', link: '.topBar a[title=]:contains(LAS Urenregistratie)', help_message: 'Ga naar LAS' },
{ key: 'g;z', link: '.topBar a[title=]:contains(Zarafa)', help_message: 'Ga naar Webmail' },

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
{ key: 'j', down: '.branchContainer', help_message: 'Selecteer volgende forum (bericht)' },
{ key: 'k', up: '.branchContainer', help_message: 'Selecteer vorige forum (bericht)' },
{ key: 'v', click: '.branchContainer.selected .branchTitle a', help_message: 'Open geselecteerd forum (bericht)', help_selector: '.branchContainer' },
{ key: 'shift+v', click: '.branchContainer.selected .branchDescription a', help_message: 'Ga naar laatste reactie van geselecteerd forum (bericht)', help_selector: '.branchContainer' },
// keyboard navigation gateway
{ key: 'j', down: '.messageBlock > div:first-child', help_message: 'Selecteer volgend netwerkbericht' },
{ key: 'k', up: '.messageBlock > div:first-child', help_message: 'Selecteer vorig netwerkbericht' },
{ key: 'v', click: '.messageBlock > div.selected + div.msgReactions:first a', help_message: 'Toon/Verberg reacties van geselecteerd netwerkbericht', help_selector: '.messageBlock > div:first-child' },
{ key: 'return', focus: '.messageBlock > div.selected + div.msgReactions + div.msgReactions + div.msgComments div.commentForm div.commentFormContent textarea', help_message: 'Schrijf reactie bij geselecteerd netwerkbericht', help_selector: '.messageBlock > div:first-child' },
// keyboard navigation blog
{ key: 'j', down: '.commonContentPost .postTitle', help_message: 'Selecteer volgend nieuwsbericht' },
{ key: 'k', up: '.commonContentPost .postTitle', help_message: 'Selecteer vorig nieuwsbericht' },
{ key: 'v', click: '.commonContentPost .postTitle.selected a', help_message: 'Open geselecteerd nieuwsbericht', help_selector: '.commonContentPost .postTitle' },
];
