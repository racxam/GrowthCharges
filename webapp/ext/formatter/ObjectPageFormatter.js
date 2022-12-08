jQuery.sap.declare("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
com.gc.dashboard.ext.formatter.ObjectPageFormatter = {
    getCBCObjectKey: function(requestID, version1, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version1}CBC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getDCObjectKey: function(requestID, version1, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version1}DC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getCILObjectKey: function(requestID, version1, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version1}CIL`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getPayObjectKey: function(requestID, version1, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version1}PAY`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    }
    
	};