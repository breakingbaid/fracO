pragma solidity 0.4.25;

contract election {
    uint256 public totalUsers = 1; 
    uint256 public totalLand = 1; 
    uint256 public totalfraco = 1; 
    // Model a Candidate
    struct Candidate {
        uint fid;
        bytes fname;
        bytes loc;
        bytes32[] lands;
        bytes contact;
        bytes aadhar;
        bytes accountAddress;
    }
    struct land_registration
    {
        uint landId;
        string name;
        uint256 totalArea;
        uint256 farmingArea;
        bytes fracoId;
        bytes ownerId;
    }
    struct fracos
    {
        uint fracoId;
        bytes fracname;
        bytes creatorId;
        bytes partnerId;
        bytes validFrom;
        bytes validTill;
        bytes lands;
        bytes resource;
        bytes status;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        //addCandidate("breakingbaid");
        //addCandidate("Hendricks");
        //addCandidate("Fridge");
    }

    function addCandidate (string _name, string _loc , bytes32[] land,string _number , string _aadhar, string _accountAddress) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, bytes(_name), bytes(_loc),land,bytes(_number),bytes(_aadhar),bytes(_accountAddress));
    }

    mapping (uint => land_registration) public l1;
    
    land_registration[] public lm;
    
    function landreg(string _name, uint256 totalArea, uint256 farmingArea, string _ownerId) {
        var lnew = land_registration(totalLand,_name,totalArea,farmingArea,"fracoId",bytes(_ownerId));
        l1[totalLand] = lnew;
        lm.push(lnew);
        totalLand++; 

    }

mapping (uint => fracos) fracos1;
fracos[] public fracom;
function produceFraco(string _fracname, string _creatorId, string _validFrom,string _validTill, string _lands2, string _resource, string _status) {
    
        var frnew = fracos(totalfraco,bytes(_fracname),bytes(_creatorId),"pid",bytes(_validFrom),bytes(_validTill),bytes(_lands2),bytes(_resource),"Initiated");
        fracos1[totalfraco] = frnew;
        fracom.push(frnew);
        totalfraco++; 

}

   

}