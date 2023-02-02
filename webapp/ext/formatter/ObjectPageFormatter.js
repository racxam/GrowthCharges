jQuery.sap.declare("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
com.gc.dashboard.ext.formatter.ObjectPageFormatter = {
    getCBCObjectKey: function(requestID, version, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version}CBC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getDCObjectKey: function(requestID, version, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version}DC`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getCILObjectKey: function(requestID, version, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version}CIL`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    },
    getPayObjectKey: function(requestID, version, DraftGuid){
        var sObjectKey = "";
        if(requestID){
            sObjectKey = `${requestID}${version}PAY`;
        }else{
            sObjectKey = DraftGuid;
        }            
        return sObjectKey;
    }
    
	};