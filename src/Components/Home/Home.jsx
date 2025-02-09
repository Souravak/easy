import React, { useState } from "react";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [imeiId, setImeiId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [generatedData, setGeneratedData] = useState({
    prompt: "",
    removeTwoFactor: "",
    setTwoFactor: "",
    adminPassword: "",
  });

  const handleImeiGenerate = () => {
    const promptCommand = `wdupdate.sh profileId=${imeiId} password='$2a$10$7chCrMOjLQdbHFkdS1uEA.oVmOgHoWDYx/unR9HArf7nurWc.ySsW' bcrypt=true`;
    setGeneratedData((prevData) => ({
      ...prevData,
      prompt: promptCommand,
    }));
  };

  const handlePasswordGenerate = () => {
    const removeTwoFactor = `sh /usr/local/ecomm/app/prod/wag-cs-ocapp/update2fa.sh profileId=${imeiId} option=set`;
    const setTwoFactor = `sh /usr/local/ecomm/app/prod/wag-cs-ocapp/update2fa.sh profileId=${imeiId} option=revert`;
    const adminPassword = `pwdupdate.sh profileId=${imeiId} password='${oldPassword}' bcrypt=true`;
    setGeneratedData({
      prompt: generatedData.prompt,
      removeTwoFactor,
      setTwoFactor,
      adminPassword,
    });
  };

  return (
    <div className="container">
      <h1>Home</h1>

      {/* Directory Section */}
      <div className="input-group">
        <label>Directory</label>
        <div className="input-wrapper">
          <input type="text" value="cd /usr/local/ecomm/app/prod/wag-cs-ocapp" readOnly />
          <button onClick={() => navigator.clipboard.writeText("cd /usr/local/ecomm/app/prod/wag-cs-ocapp")} className="copy">Copy</button>
        </div>
      </div>

      {/* IMEI Section */}
      <div className="input-group">
        <label>IMEI ID</label>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter IMEI ID"
            value={imeiId}
            onChange={(e) => setImeiId(e.target.value)}
            onFocus={() => setImeiId("")}
          />
          <button onClick={handleImeiGenerate} className="generate">Gene</button>
        </div>
      </div>

      <div className="input-group">
        <label>Change Password</label>
        <div className="input-wrapper">
          <input type="text" value={generatedData.prompt} readOnly placeholder="Generated Command" />
          <button onClick={() => navigator.clipboard.writeText(generatedData.prompt)} className="copy">Copy</button>
        </div>
      </div>

      {/* Old Password Section */}
      <div className="input-group">
        <label>Old Password</label>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button onClick={handlePasswordGenerate} className="generate">Gene</button>
        </div>
      </div>

      {/* Generated Commands */}
      <div className="input-group">
        <label>Removing Two Factor Auth</label>
        <div className="input-wrapper">
          <input type="text" value={generatedData.removeTwoFactor} readOnly />
          <button onClick={() => navigator.clipboard.writeText(generatedData.removeTwoFactor)} className="copy">Copy</button>
        </div>
      </div>

      <div className="input-group">
        <label>Setting Two Factor Auth</label>
        <div className="input-wrapper">
          <input type="text" value={generatedData.setTwoFactor} readOnly />
          <button onClick={() => navigator.clipboard.writeText(generatedData.setTwoFactor)} className="copy">Copy</button>
        </div>
      </div>

      <div className="input-group">
        <label>Setting Old Password</label>
        <div className="input-wrapper">
          <input type="text" value={generatedData.adminPassword} readOnly />
          <button onClick={() => navigator.clipboard.writeText(generatedData.adminPassword)} className="copy">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
