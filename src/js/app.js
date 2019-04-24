App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,


  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) 
      {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];
          console.log(id+name+voteCount+candidate[3]+candidate[4]+candidate[5])
          console.log(App.account)



                    console.log(candidate[5]+" "+candidate[4]+candidate[0])

          $('#profile').html("<p>Farmer id: "+candidate[0] + "</p> <p> Name: "+ candidate[1] + "</p>"+ "</p> <p> Location: "+ candidate[2] + "</p>"+ "</p> <p> Contact: "+ candidate[3] + "</p>"+ "</p> <p> Aadhar: "+ candidate[4] + "</p>"+ "</p> <p> Address on Blockchain: "+ candidate[5] + "</p>");
          

        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
    
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });

      App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.totalfraco();
    }).then(function(totalfraco) {
    

      var fracoform123=$('#fracolist');
      var xx1="";

      for (var i = 1; i < totalfraco; i++) 
      {
        electionInstance.fracos1(i).then(function(f) {
          var id = f[0];
          var name = f[1];
          var voteCount = f[2];
          console.log(id+name+voteCount)

          xx1="<button type='button' class='btn btn-primary genric-btn-2 info-border-2 circle' style='padding-left: 10px; padding-right: 10px; text-align: initial' data-toggle='modal' data-target='#viewfracomodelId' onclick='fracodeet(\""+name+"\")'>"+name+"</button>"+xx1;
          console.log(xx1);
          fracoform123.html(xx1);
          

        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
    
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });



        App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.totalLand();

    }).then(function(totalLand) {
var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      var fracoform=$('#landdrop');
            fracoform.empty();

      for (var i = 1; i < totalLand; i++) {

        electionInstance.l1(i).then(function(lm) {
          var id = lm[0];
          var name = lm[1];
          var voteCount = lm[2];

                    console.log(id +"-" +name +"-"+ voteCount+"-"+lm[3]+"-"+lm[4])
                    //$('#landregs').html("<p>Land id: "+lm[0] + "</p> <p>Land Name: "+ lm[1] + "</p>"+ "</p> <p> Location: "+ lm[2] + "</p>"+ "</p> <p> Total Area: "+ lm[3] + "</p>"+ "</p> <p> Farming Area: "+ lm[4] + "</p>"+ "</p>");
    // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td><td>" + lm[3] + "</td></tr>" 
          candidatesResults.append(candidateTemplate);

          var xx="<option value='"+name+"'>"+name+"</option>";
          var xx1="<li data-value='"+name+"'class='option'>"+name+"</li>";
          console.log(xx);
          fracoform.append(xx);
          fracoform.parent().find('div').find('ul').append(xx1);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
    
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });

  },

  writer: function() {
        var name= $('#fname').val();
        var loc=$('#location').val();
        var contact=$('#Contact').val();
        var ad=$('#Adhaar').val();
        var address234 = App.account+"";
                console.log(name+loc+contact+address234)

    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(name,loc,[],contact,ad,address234, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      alert("Write operation performed on Blockchain")
     location.reload();

    }).catch(function(err) {
      console.error(err);
    });
  },
    writer2: function() {
        var name= $('#lname').val();
        var loc=$('#lta').val();
        var contact=$('#lfa').val();
        var address = App.account+"";
        console.log(name+loc+contact+address)
    App.contracts.Election.deployed().then(function(instance) {
      return instance.landreg(name,loc,contact,address, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      alert(" Land registration Write operation performed on Blockchain")
      location.reload();

    }).catch(function(err) {
      console.error(err);
    });
  },
    writer3: function() {
        var name=$('#fraconame').val();
        var cid=App.account
        var vt=$('#validfrom').val();
        var vto=$('#validtill').val();
        var res=$( '#res option:selected').text();
        var landsname=$('#landdrop option:selected').text();


        var address = App.account+"";
    App.contracts.Election.deployed().then(function(instance) {
      return instance.produceFraco(name,cid,vt,vto,landsname,res,"initialised" ,{ from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      alert(" FracO registration operation performed on Blockchain")
      location.reload();

    }).catch(function(err) {
      console.error(err);
    });
  }
};

function fracodeet(fracname){

       App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.totalfraco();
    }).then(function(totalfraco) {
    

      var fracoform123=$('#fracolist');
      var xx1="";

      for (var i = 1; i < totalfraco; i++) 
      {
        electionInstance.fracos1(i).then(function(f) {
          var id = f[0];
          var name = f[1];
          var voteCount = f[2];
            if(name==fracname)
            {
                        fracofetch(id,name,voteCount,f[3])
            }
                        console.log(id+name+voteCount)

      
          

        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
    
  
    }).catch(function(error) {
      console.warn(error);
    });


}


function fracofetch(id,fracname,cid,pid){

       App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.totalfracoresc();
    }).then(function(totalfracoresc) {
    

      var fracoform123=$('#fracolist');
      var xx1="";

      for (var i = 1; i < totalfracoresc; i++) 
      {
        electionInstance.fracosres1(i).then(function(fr) {
          var id2 = fr[0];
          var name = fr[1];
          var voteCount = fr[2];
          console.log(name)
            if(id2+""==id+"")
            {
              $('#viewfracoheader').html(fracname);                           //  console.log(id+name+voteCount)
              console.log(id+name+voteCount)
              $('#viewfracobody').html("<p>FracO id: "+id + "</p> <p> FracO Name: "+ fracname + "</p>  <p> Creator id : "+ cid + "</p>. <p> Partner Id: "+ pid + "</p>  <p> Valid From: "+ fr[1] + "</p>  <p> Valid Till: "+ fr[2] + "</p>  <p> Resource being shared: "+ fr[4] + "</p>  <p> Status: "+ fr[5] + "</p>");


            }
            else
            {
              console.log(id2+""+id)
              console.log(typeof id)
              console.log(typeof id2)


            }


          

        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
    
  
    }).catch(function(error) {
      console.warn(error);
    });


}

$(function() {
  $(window).load(function() {
    App.init();
  });
});