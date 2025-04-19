import React from "react";

const Dashboard: React.FC = () => {
  return (
    <section className="bg-[rgba(249,116,21,0.03)] flex min-h-[757px] w-full flex-col overflow-hidden items-stretch justify-center -mt-4 px-[150px] py-10 max-md:max-w-full max-md:px-5">
      <div className="flex w-full items-center gap-[40px_111px] max-md:max-w-full">
        <div className="self-stretch min-w-60 w-[873px] my-auto max-md:max-w-full">
          <div className="flex w-full flex-col items-stretch max-md:max-w-full">
            <div className="w-full text-[50px] text-[#333] font-black text-center leading-[94px] pb-[23px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px]">
              <h2 className="z-10 mr-[18px] max-md:max-w-full max-md:text-[40px] max-md:leading-[84px] max-md:mr-2.5">
                ابني، صمّم، وابدأ تبيع من غير أي تعقيد
              </h2>
              <div className="bg-[rgba(255,220,96,1)] flex shrink-0 h-[13px] max-md:max-w-full" />
            </div>
            <p className="text-[#767676] text-right text-lg font-medium leading-6 mt-4 max-md:max-w-full">
              حقِّق نمو علامتك التجارية في سوق الأزياء والعبايات مع حلول نُسجت
              بعناية لتسهِّل إدارة متجرك وتقدِّم تجربة تسوُّق استثنائية لعملائك.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch mt-[41px] max-md:max-w-full max-md:mt-10">
            <button className="bg-[rgba(249,116,21,1)] border flex min-h-14 w-[228px] max-w-full flex-col overflow-hidden items-center text-base text-white font-bold justify-center p-5 rounded-[256px] border-[rgba(237,237,237,1)] border-solid">
              <div className="flex items-center gap-1.5">
                <span className="self-stretch gap-[9px] my-auto">
                  ابدأ تجربتك المجانية الان
                </span>
              </div>
            </button>
            <p className="text-[#767676] text-right text-sm font-medium mt-3 max-md:max-w-full">
              مجانا لمدة 7 ايام بدون بطاقو بنكية او مصاريف خفية
            </p>
          </div>
        </div>

        <div className="self-stretch min-w-60 w-[1090px] my-auto pt-[194px] rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:pt-[100px]">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[65%] max-md:w-full max-md:ml-0">
              <div className="justify-center items-center shadow-[0px_40px_50px_0px_rgba(185,192,201,0.20)] bg-white flex min-h-[207px] grow flex-col w-full mt-[276px] pl-[21px] pr-5 pt-3 pb-[29px] rounded-[9.945px] border-[0.827px] border-solid border-[#F3F3F3] max-md:max-w-full max-md:mt-10 max-md:pl-5">
                <div className="flex w-full max-w-[615px] flex-col items-center justify-center max-md:max-w-full">
                  <div className="flex w-full items-center gap-[40px_100px] font-semibold justify-between flex-wrap">
                    <h3 className="text-[#152C5B] text-xl self-stretch my-auto">
                      Upcoming Payments
                    </h3>
                    <button className="text-[#E50F8D] text-right text-sm self-stretch my-auto">
                      View All
                    </button>
                  </div>

                  <div className="w-full font-medium mt-[21px] max-md:max-w-full">
                    <div className="flex min-h-3 w-full items-center gap-[40px_64px] text-xs text-[#777E90] whitespace-nowrap flex-wrap max-md:max-w-full">
                      <div className="self-stretch flex min-w-60 items-center gap-[40px_70px] justify-between grow shrink w-[470px] my-auto max-md:max-w-full">
                        <div className="self-stretch flex min-w-60 items-center gap-[40px_100px] justify-between w-[367px] my-auto">
                          <div className="self-stretch flex items-center gap-[40px_64px] justify-between w-[228px] my-auto">
                            <div className="self-stretch flex items-center gap-[31px] w-[139px] my-auto">
                              <span className="self-stretch my-auto">
                                Photos
                              </span>
                              <span className="self-stretch my-auto">Name</span>
                            </div>
                            <span className="self-stretch my-auto">Date</span>
                          </div>
                          <span className="self-stretch my-auto">Status</span>
                        </div>
                        <span className="self-stretch my-auto">Amount</span>
                      </div>
                      <span className="self-stretch my-auto">Actions</span>
                    </div>

                    {/* Payment row 1 */}
                    <div className="flex w-full items-center gap-[18px] flex-wrap mt-[17px] max-md:max-w-full">
                      <div className="self-stretch flex items-center gap-[25px] flex-1 shrink basis-[0%] my-auto">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e073f1bf36ba21fac83bb2e430369dd52cf7cb8?placeholderIfAbsent=true"
                          alt="Facebook Ads"
                          className="aspect-[0.97] object-contain w-[39px] self-stretch shrink-0 my-auto rounded-lg"
                        />
                        <div className="self-stretch flex flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto">
                          <div className="text-[#152C5B] text-sm">
                            Facebook Ads
                          </div>
                          <div className="text-[#777E90] text-xs mt-[7px]">
                            Ads service
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex min-w-60 items-center gap-[33px] text-sm text-[#152C5B] my-auto">
                        <div className="self-stretch flex min-w-60 items-center gap-[30px] w-[302px] my-auto">
                          <div className="self-stretch w-[100px] my-auto">
                            Mar 11, 2020
                          </div>
                          <div className="text-[#F59D31] self-stretch w-[73px] my-auto">
                            Pending
                          </div>
                          <div className="self-stretch w-[69px] my-auto">
                            $500.00
                          </div>
                        </div>
                        <button className="self-stretch border gap-2 whitespace-nowrap text-center my-auto pt-[7px] pb-2 px-[17px] rounded-lg border-[rgba(234,238,247,1)] border-solid">
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Payment row 2 */}
                    <div className="flex w-full items-center gap-[18px] flex-wrap mt-[17px] max-md:max-w-full">
                      <div className="self-stretch flex items-center gap-[25px] flex-1 shrink basis-[0%] my-auto">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2053c65fe8fcab7659e9399ecf758026b23ed38?placeholderIfAbsent=true"
                          alt="Fiverr.inc"
                          className="aspect-[0.97] object-contain w-[39px] self-stretch shrink-0 my-auto rounded-lg"
                        />
                        <div className="self-stretch flex flex-col items-stretch justify-center w-[123px] my-auto">
                          <div className="text-[#152C5B] text-sm">
                            Fiverr.inc
                          </div>
                          <div className="text-[#777E90] text-xs mt-[7px]">
                            Marketplace payment
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex min-w-60 items-center gap-[33px] text-sm text-[#152C5B] my-auto">
                        <div className="self-stretch flex min-w-60 items-center gap-[30px] w-[302px] my-auto">
                          <div className="self-stretch w-[100px] my-auto">
                            Mar 10, 2020
                          </div>
                          <div className="text-[#F59D31] self-stretch w-[73px] my-auto">
                            Pending
                          </div>
                          <div className="self-stretch w-[69px] my-auto">
                            $55.00
                          </div>
                        </div>
                        <button className="self-stretch border gap-2 whitespace-nowrap text-center my-auto pt-[7px] pb-2 px-[17px] rounded-lg border-[rgba(234,238,247,1)] border-solid">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[35%] ml-5 max-md:w-full max-md:ml-0">
              <div className="justify-center items-center shadow-[0px_40px_50px_0px_rgba(185,192,201,0.20)] flex min-h-[326px] flex-col max-md:mt-10">
                <div className="bg-white border flex flex-col items-center justify-center pt-[11px] pb-[27px] px-[22px] rounded-[10px] border-[rgba(243,243,243,1)] border-solid max-md:px-5">
                  <h3 className="self-stretch max-w-full w-[311px] text-xl text-[#152C5B] font-semibold">
                    Payment Analytics
                  </h3>

                  <div className="flex flex-col items-stretch text-xs font-medium whitespace-nowrap mt-[30px]">
                    <div className="flex items-center gap-[15px]">
                      <div className="self-stretch flex items-center gap-[5px] justify-between w-[89px] my-auto">
                        <div className="rounded bg-[rgba(245,157,49,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto" />
                        <span className="text-[#777E90] self-stretch my-auto">
                          Payment
                        </span>
                        <span className="text-[#152C5B] self-stretch my-auto">
                          $514
                        </span>
                      </div>
                      <div className="self-stretch flex items-center gap-1 my-auto">
                        <span className="text-[#777E90] self-stretch my-auto">
                          Receive
                        </span>
                        <span className="text-[#152C5B] self-stretch my-auto">
                          $2,124
                        </span>
                      </div>
                      <div className="self-stretch flex items-center gap-1 my-auto">
                        <span className="text-[#777E90] self-stretch my-auto">
                          Send
                        </span>
                        <span className="text-[#152C5B] self-stretch my-auto">
                          $1,547
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-[13px]">
                      <div className="flex items-center gap-1 justify-between w-[93px]">
                        <div className="rounded bg-[rgba(146,121,237,1)] self-stretch flex w-[9px] shrink-0 h-[9px] my-auto" />
                        <span className="text-[#777E90] self-stretch my-auto">
                          Deposit
                        </span>
                        <span className="text-[#152C5B] self-stretch my-auto">
                          $1,250
                        </span>
                      </div>
                      <div className="flex items-center gap-[5px] justify-between w-24">
                        <span className="text-[#777E90] self-stretch my-auto">
                          Withdraw
                        </span>
                        <span className="text-[#152C5B] self-stretch my-auto">
                          $200
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
