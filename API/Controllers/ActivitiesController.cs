using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities() =>
            await Mediator.Send(new List.Query());

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id) =>
            await Mediator.Send(new Details.Query { Id = id });

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity) =>
                     Ok(await Mediator.Send(new Create.Command() { Activity = activity }));

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity([FromBody] Activity activity, Guid id)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command() { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command() { Id = id }));
        }
    }
}