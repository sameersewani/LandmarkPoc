public class contactTriggerHandlerClass {
    public static string createCommunityUser(List<Contact> conList){
        Profile profile = [SELECT Id, Name FROM Profile WHERE UserLicense.Name = 'Customer Community Plus' Limit 1];        
        String result = '';
        List<User> usList = new List<User>();
        //Contact con = [SELECT firstname, lastname, id, email, accountId, Account.Name FROM contact WHERE Id=:contactId limit 1];
        for(Contact con : conList){
            if(con == null){
                return result;
            }
            User u = new User();
            u.firstName = con.firstName;
            u.lastName = con.lastName;
            u.ContactId = con.Id;
            u.Username = con.lastName;
            u.Email = con.email;
            u.CompanyName = con.Account.Name;
            String conLastName = con.LastName;
            if(conLastName.length() < 2){
                conLastName += conLastName;
            }
            Blob b = Crypto.GenerateAESKey(128);
            String h = EncodingUtil.ConvertTohex(b);
            String guid = conLastName.substring(0,2)+h.SubString(0,6);
            u.Alias = guid.length() > 8 ? guid.subString(0,8) : guid;
            u.CommunityNickname = u.Alias;
            u.TimeZoneSidKey = UserInfo.getTimeZone().getId();
            u.LocaleSidKey = 'en_US';
            u.EmailEncodingKey = 'ISO-8859-1';
            u.LanguageLocaleKey = 'en_US';
            u.ProfileId = profile.id;
            usList.add(u);
        } 
           
        try {
            insert usList;
            List<PermissionSetAssignment> psaList = new List<PermissionSetAssignment>();
            for(User u: usList){
            	PermissionSetAssignment psa = new PermissionSetAssignment();
                psa.PermissionSetId = '0PS2w000004lmENGAY';
                // psa.IsActive = true;
                psa.AssigneeId = u.Id;
                psaList.add(psa);
            }
            insert psaList;
            
            
            
            return 'SUCCESS';
        }
        catch (Exception e) {
            System.debug(e.getMessage());
            return e.getMessage();
        }
    }
}